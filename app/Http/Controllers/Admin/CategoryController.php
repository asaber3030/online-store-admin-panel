<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categories\CreateCategoryRequest;
use App\Http\Requests\Categories\UpdateSubCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Models\App;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CategoryController extends Controller {

  # List Categories
  function listCategories() {
    return inertia('Admin/Categories/List/ListCategories', [
      'categories' => Category::withCount('sub_categories', 'products')->orderBy('id', 'desc')->get(),
      'paginatedCategories' => Category::withCount('sub_categories', 'products')->orderBy('id', 'desc')->paginate(10)
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Categories/Trash/TrashedCategories', [
      'categories' => Category::onlyTrashed()->orderBy('id', 'desc')->get(),
    ]);
  }

  # Delete All
  function deleteSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($request->input('ids') as $key => $id) {
      $find = Category::find($id);
      if ($find) {
        Category::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('Category does not exist', 'warning');
      }
    }
    return to_route('admin.cat.list');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = Category::withTrashed()->find($id);
      if ($find) {
        Category::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('User does not exist', 'warning');
      }
    }
    return to_route('admin.cat.list.trashed');
  }

  # Create Category
  function createCategoryView() {
    return inertia('Admin/Categories/Create/CreateCategory', [
      'lastCreatedCategory' => Category::orderBy('id', 'desc')->get()->first(),
    ]);
  }
  function createCategoryAction(CreateCategoryRequest $request) {
    $request->validated();
    $file = $request->file('icon');
    $iconName = generateFileName() . $file->getClientOriginalExtension();
    $file->move(CATEGORIES_ICONS_TARGET, $iconName);

    Category::create([
      'icon' => CATEGORIES_ICONS_TARGET . $iconName,
      'name' => $request->input('name'),
      'search_keywords' => $request->input('keywords'),
      'type' => $request->input('type')
    ]);

    return to_route('admin.cat.list');

  }

  # Update Category
  function updateCategoryView(Category $category) {
    return inertia('Admin/Categories/Update/UpdateCategory', [
      'lastUpdatedCategory' => Category::orderBy('updated_at', 'desc')->get()->first(),
      'category' => Category::withCount('sub_categories', 'products')->find($category->id),
    ]);
  }
  function updateCategoryAction(UpdateCategoryRequest $request, Category $category) {

    $request->validated();

    $fileName = $category->icon;

    if ($request->hasFile('icon')) {
      $file = $request->file('icon');
      $fileName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(CATEGORIES_ICONS_TARGET, $fileName);
    }

    Category::create([
      'icon' => $request->hasFile('icon') ? CATEGORIES_ICONS_TARGET . $fileName : $category->icon,
      'name' => $request->input('name'),
      'search_keywords' => $request->input('keywords')
    ]);

    return to_route('admin.cat.list');

  }

  # Delete Category
  function deleteCategoryView(Category $category) {
    return inertia('Admin/Categories/Delete/DeleteCategory', [
      'category' => Category::withCount('sub_categories', 'products')->find($category->id)
    ]);
  }
  function deleteCategoryAction(Request $request, Category $category) {
    if (Auth::guard('admin')->check()) {
      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());
      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $category->delete();
          message('Category ' . $category->name . ' has been temporary deleted', 'warning');
          activity('Category ' . $category->name . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.cat.list');
        } elseif ($request->deleteType == 'force') {
          $category->forceDelete();
          message('Category ' . $category->name . ' has been deleted forever!', 'error');
          activity('Category ' . $category->name . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.cat.list');

        }

      } else {
        session()->put('passwordTries', $request->input('tries'));
        session()->flash('customErrors', 'Application password is wrong! you tried ' . $request->input('tries') . ' times');
        if (session()->get('passwordTries') > 5) {
          Auth::guard('admin')->logout();
          return to_route('admin.login');
        }
      }
    }
  }

  ####### Sub Categories #######

  # List sub categories
  function listSubCategories(Category $category) {
    return inertia('Admin/Categories/SubCategories/ListSubCategories', [
      'category' => Category::withCount('sub_categories', 'products')->with([ 'sub_categories' => fn($q) => $q->with('category') ])->find($category->id)
    ]);
  }

  # Create Sub Category
  function createSubView(Category $category) {
    return inertia('Admin/Categories/SubCategories/CreateSubCategory', [
      'category' => Category::withCount('sub_categories', 'products')->with([ 'sub_categories' => fn($q) => $q->with('category') ])->find($category->id)
    ]);
  }
  function createSubAction(UpdateSubCategoryRequest $request, Category $category) {
    $request->validated();
    SubCategory::create([
      'name' => $request->input('name'),
      'category' => $category->id,
      'search_keywords' => $request->input('keywords')
    ]);
    message('Sub Category has been created successfully for ' . $category->name);
    activity('New Sub Category added for ' . $category->name, 'plus', $request->url());
    return to_route('admin.cat.view.sub', $category->id);
  }

  # Update Sub Category
  function updateSubView(Category $category, SubCategory $sub) {
    if ($sub->category == $category->id) {
      return inertia('Admin/Categories/SubCategories/UpdateSubCategory', [
        'sub' => SubCategory::with('category')->find($sub->id),
        'category' => Category::withCount('sub_categories', 'products')->with([ 'sub_categories' => fn($q) => $q->with('category') ])->find($category->id)
      ]);
    }
    return abort(404);
  }
  function updateSubAction(UpdateSubCategoryRequest $request, Category $category, SubCategory $sub) {
    if ($sub->category == $category->id) {
      $request->validated();
      SubCategory::where('id', $sub->id)->update([
        'name' => $request->input('name'),
        'category' => $category->id,
        'search_keywords' => $request->input('keywords')
      ]);
      message('Sub Category has been updated successfully for ' . $category->name);
      activity('Sub Category has been updated for ' . $category->name, 'edit', $request->url());
      return to_route('admin.cat.view.sub', $category->id);
    }
    return abort(404);
  }

  # Delete Sub Category
  function deleteSubView(Category $category, SubCategory $sub) {
    if ($sub->category == $category->id) {
      return inertia('Admin/Categories/SubCategories/DeleteSubCategory', [
        'sub' => SubCategory::with('category')->find($sub->id),
        'category' => Category::withCount('sub_categories', 'products')->with([ 'sub_categories' => fn($q) => $q->with('category') ])->find($category->id)
      ]);
    }
    return abort(404);
  }
  function deleteSubAction(Request $request, Category $category, SubCategory $sub) {
    if ($sub->category == $category->id && Auth::guard('admin')->check()) {
      $sub->delete();
      message('Sub Category has been deleted successfully of category: ' . $category->name, 'warning');
      activity('Sub Category has been deleted of ' . $category->name, 'trash', $request->url());
      return to_route('admin.cat.view.sub', $category->id);
    }
    return abort(404);
  }
}
