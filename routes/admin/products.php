<?php

use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.products.'], function () {

  Route::controller(ProductController::class)->group(function () {

    # Listing Product
    Route::get('/', 'listProducts')->name('list');

    # Trash
    Route::get('trash', 'listTrashed')->name('list.trashed');

    # Delete selected
    Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

    # Restore selected
    Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

    # Import Products
    Route::get('import', 'importProductView')->name('import');
    Route::post('import', 'importProductAction');

    # New Product
    Route::get('create', 'createProductView')->name('create');
    Route::post('create', 'createProductAction');

    # {product} Actions & Views
    Route::prefix('{product}')->group(function () {

      # Update Product
      Route::get('update', 'updateProductView')->name('update');
      Route::post('update', 'updateProductAction');

      # Delete Product
      Route::get('delete', 'deleteProductView')->name('delete');
      Route::post('delete', 'deleteProductAction');

      # Product Data
      Route::group(['prefix' => 'view'], function () {

        # View Product
        Route::get('/', 'viewProduct')->name('view');

        ## Images

        Route::prefix('images')->group(function () {

          # List Product Images
          Route::get('/', 'viewImages')->name('view.images');

          # Add Product Images
          Route::post('add', 'addImagesAction')->name('create.image');

          # Delete Product Image
          Route::post('{image}/delete', 'deleteImageAction')->name('delete.image');

        });

      });

    });

  });

});
