<?php

namespace App\Http\Middleware;

use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return string|null
   */
  public function version(Request $request)
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return mixed[]
   */
  public function share(Request $request)
  {
    return array_merge(parent::share($request), [
      'appURL' => 'http://127.0.0.1:8000/',
      'auth' => [
        'user' => $request->user(),
      ],
      'customErrors' => session('customErrors'),
      'passwordTries' => session('passwordTries') ?? 0,

      'flash' => [
        'message' => session('flashMessage'),
        'type' => session('flashMessageType')
      ],
      'admin' => Auth::guard('admin')->user(),
      'ziggy' => function () use ($request) {
        return array_merge((new Ziggy)->toArray(), [
          'location' => $request->url(),
        ]);
      },
    ]);
  }
}
