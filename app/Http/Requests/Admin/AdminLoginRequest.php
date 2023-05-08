<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AdminLoginRequest extends FormRequest
{

  public function authorize()
  {
    return Auth::guard('admin')->attempt([
      'username' => $this->user('admin')->username,
      'password'
    ]);
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules()
  {
    return [
      'username' => 'required',
      'password' => 'required'
    ];
  }
}
