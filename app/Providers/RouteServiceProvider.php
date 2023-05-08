<?php

namespace App\Providers;

use App\Models\App;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{

  public const HOME = '/dashboard';

  public function apiRoutes() {

    $apiURLCode = App::getAPIURLCode();

    Route::middleware('api')
      ->prefix('app-api/brands/' . $apiURLCode)
      ->group(base_path('routes/api/brands_api.php'));
    Route::middleware('api')
      ->prefix('app-api/categories/' . $apiURLCode)
      ->group(base_path('routes/api/categories_api.php'));
    Route::middleware('api')
      ->prefix('app-api/jobs/' . $apiURLCode)
      ->group(base_path('routes/api/jobs_api.php'));
    Route::middleware('api')
      ->prefix('app-api/users/' . $apiURLCode)
      ->group(base_path('routes/api/users_api.php'));
    Route::middleware('api')
      ->prefix('app-api/products/' . $apiURLCode)
      ->group(base_path('routes/api/products_api.php'));
  }

  public function adminInnerRoutes() {
    $adminURLCode = App::getAdminURLCode();

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/companies')
      ->group(base_path('routes/admin/companies.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/categories')
      ->group(base_path('routes/admin/categories.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/products')
      ->group(base_path('routes/admin/products.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/users')
      ->group(base_path('routes/admin/users.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/jobs')
      ->group(base_path('routes/admin/jobs.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/services')
      ->group(base_path('routes/admin/services.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/settings')
      ->group(base_path('routes/admin/settings.php'));

    Route::middleware('web')
      ->prefix('admin/' . $adminURLCode . '/import')
      ->group(base_path('routes/admin/importing.php'));

  }

  public function boot() {
    $this->configureRateLimiting();
    $this->routes(function () {
      $adminURLCode = App::getAdminURLCode();

      Route::middleware('api')
        ->prefix('api')
        ->group(base_path('routes/api.php'));

      $this->apiRoutes();

      Route::middleware('web')
        ->group(base_path('routes/web.php'));

      Route::middleware('web')
        ->prefix('admin/' . $adminURLCode)
        ->group(base_path('routes/admin.php'));

      $this->adminInnerRoutes();

    });
  }

  protected function configureRateLimiting() {
    RateLimiter::for('api', function (Request $request) {
      return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });
  }
}
