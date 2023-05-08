<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Products\CreateProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\App;
use App\Models\Category;
use App\Models\Company;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ProductController extends Controller {

  # List Products
  function listProducts() {
    return inertia('Admin/Products/List/ListProducts', [
      'products' => Product::with('user', 'category', 'sub_category')->orderBy('id', 'desc')->get()
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Products/Trash/TrashedProducts', [
      'products' => Product::onlyTrashed()->with('user', 'category', 'sub_category')->orderBy('id', 'desc')->get(),
    ]);
  }

  # Delete All
  function deleteSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($request->input('ids') as $key => $id) {
      $find = Product::find($id);
      if ($find) {
        Product::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('Product does not exist', 'warning');
      }
    }
    return to_route('admin.products.list');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = Product::withTrashed()->find($id);
      if ($find) {
        Product::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('Product does not exist', 'warning');
      }
    }
    return to_route('admin.products.list.trashed');
  }

  # Create Product
  function createProductView(string $creationType = 'user') {
    return inertia('Admin/Products/Create/CreateProduct', [
      'categories' => Category::all(),
      'sub_categories' => SubCategory::all(),
      'users' => User::all(),
      'companies' => Company::with('user')->get()
    ]);
  }
  function createProductAction(CreateProductRequest $request, string $creationType = 'user') {
    $request->validated();
    $file = $request->file('image');
    $productImageName = generateFileName() . $file->getClientOriginalExtension();
    $file->move(PRODUCTS_IMAGES_TARGET, $productImageName);

    Product::create([
      'name' => $request->input('name'),
      'description' => $request->input('description'),
      'user' => $request->input('user'),
      'category' => $request->input('category'),
      'sub_category' => $request->input('sub_category'),
      'color' => $request->input('color') ?? 'N/A',
      'size' => $request->input('size') ?? 'N/A',
      'qty' => $request->input('quantity') ?? 'N/A',
      'brand' => $request->input('brand') ?? 'N/A',
      'slug' => Str::slug($request->input('name')),
      'price' => $request->input('price'),
      'offer' => $request->input('offer') ?? 'N/A',
      'image' => PRODUCTS_IMAGES_TARGET . $productImageName,
      'vat' => $request->input('vat') ?? 'N/A',
      'delivery_value' => $request->input('delivery_value') ?? 'N/A',
      'type' => $creationType == 'user' ? 0 : 1,
    ]);

    message('Product has been added successfully!');

    return to_route('admin.products.list');

  }

  # View Product
  public function viewProduct(Product $product, string $view = null) {
    return inertia('Admin/Products/View/ViewProduct', [
      'product' => Product::with(['user' => fn($q) => $q->with('company'), 'images'])->find($product->id),
    ]);
  }

  # Update Product
  function updateProductView(Product $product) {
    return inertia('Admin/Products/Update/UpdateProduct', [
      'categories' => Category::all(),
      'sub_categories' => SubCategory::all(),
      'product' => $product,
    ]);
  }
  function updateProductAction(UpdateProductRequest $request, Product $product) {

    $request->validated();

    $productImageName = $product->image;

    if ($request->hasFile('image')) {
      $file = $request->file('image');
      $productImageName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(PRODUCTS_IMAGES_TARGET, $productImageName);
    }

    Product::where('id', $product->id)->update([
      'name' => $request->input('name'),
      'description' => $request->input('description'),
      'category' => $request->input('category'),
      'sub_category' => $request->input('sub_category'),
      'color' => $request->input('color') ?? 'N/A',
      'size' => $request->input('size') ?? 'N/A',
      'qty' => $request->input('quantity') ?? 'N/A',
      'brand' => $request->input('brand') ?? 'N/A',
      'slug' => Str::slug($request->input('name')),
      'price' => $request->input('price'),
      'offer' => $request->input('offer') ?? 'N/A',
      'image' => $request->hasFile('image') ? PRODUCTS_IMAGES_TARGET . $productImageName : $product->image,
      'vat' => $request->input('vat') ?? 'N/A',
      'delivery_value' => $request->input('delivery_value') ?? 'N/A',
    ]);

    message('Product has been updated successfully!');

    if ($product->type == 0) {
      activity(
        title: 'Product with id #' . $product->id . ' of user type has been updated',
        url: $request->url(),
        icon: 'cog'
      );
    } else {
      activity(
        title: 'Product with id #' . $product->id . ' of user company has been updated',
        url: $request->url(),
        icon: 'cog'
      );
    }

    return to_route('admin.products.list');
  }

  # Delete Product
  function deleteProductView(Product $product) {
    return inertia('Admin/Products/Delete/DeleteProduct', [
      'product' => Product::with('user')->find($product->id),
    ]);
  }
  function deleteProductAction(Request $request, Product $product) {

    if (Auth::guard('admin')->check()) {

      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());

      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $product->delete();
          message('Delete #' . $product->id . ' has been temporary deleted', 'warning');
          activity('Delete #' . $product->id . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.products.list');
        } elseif ($request->deleteType == 'force') {
          $product->forceDelete();
          message('Product #' . $product->id . ' has been deleted forever!', 'error');
          activity('Product #' . $product->id . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.products.list');
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

  ##### Product Images Actions #####

  # View Images of {product}
  function viewImages(Product $product) {
    return inertia('Admin/Products/Images/ListImages', [
      'product' => Product::with([
        'images' => fn($q) => $q->orderBy('id', 'desc'),
        'category',
        'user',
        'sub_category'
      ])->find($product->id),
    ]);
  }

  # Add Image
  function addImagesAction(Request $request, Product $product) {
    if (Auth::guard('admin')->check()) {

      $request->validate([
        'image' => 'required|mimes:jpg,jpeg,png|max:5000',
        'image.*' => 'required|mimes:jpg,jpeg,png|size:5000',
      ]);

      $file = $request->file('image');
      $newFileName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(PRODUCTS_IMAGES_TARGET, $newFileName);

      ProductImages::create([
        'image' => PRODUCTS_IMAGES_TARGET . $newFileName,
        'product' => $product->id
      ]);

      message('New Image has been added for product #' . $product->id);

    }
  }

  # Delete Image
  function deleteImageAction(Request $request, Product $product, ProductImages $image) {
    if (Auth::guard('admin')->check()) {
      $image->delete();
      message('Image of ID: #' . $image->id . ' has been deleted of product #' . $product->id);
    }
  }
}
