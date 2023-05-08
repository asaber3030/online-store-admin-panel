<?php

use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.cat.'], function () {

  Route::controller(CategoryController::class)->group(function () {

    # Listing Category
    Route::get('/', 'listCategories')->name('list');
    Route::post('/', 'listCategoriesAction');

    # Trash
    Route::get('trash', 'listTrashed')->name('list.trashed');

    # Delete selected
    Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

    # Delete selected
    Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

    # New Category
    Route::get('create', 'createCategoryView')->name('create');
    Route::post('create', 'createCategoryAction');

    # {company_id} Actions & Views
    Route::prefix('{category}')->group(function () {

      # Add Sub Category
      Route::get('add-sub-category', 'addSubCategoryView')->name('add.sub');
      Route::post('add-sub-category', 'addSubCategoryAction');

      # Update Category
      Route::get('update', 'updateCategoryView')->name('update');
      Route::post('update', 'updateCategoryAction');

      # Delete Category
      Route::get('delete', 'deleteCategoryView')->name('delete');
      Route::post('delete', 'deleteCategoryAction');

      # Category Data
      Route::group(['prefix' => 'view'], function () {

        # Sub categories of {category}
        Route::prefix('sub-categories')->group(function () {

          # List Sub Categories of {category}
          Route::get('/', 'listSubCategories')->name('view.sub');

          # Create Sub Category of {category}
          Route::get('create', 'createSubView')->name('create.sub');
          Route::post('create', 'createSubAction');

          # Views of sub category
          Route::prefix('{sub}')->group(function () {

            # Update Sub Category {sub} of {category}
            Route::get('update', 'updateSubView')->name('update.sub');
            Route::post('update', 'updateSubAction');

            # Delete Sub Category {sub} of {category}
            Route::get('delete', 'deleteSubView')->name('delete.sub');
            Route::post('delete', 'deleteSubAction');

          });

        });

      });

    });

  });

});
