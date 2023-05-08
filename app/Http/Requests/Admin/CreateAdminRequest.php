<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateAdminRequest extends FormRequest
{

  public function authorize() {
    return Auth::guard('admin')->check();
  }

  public function rules() {
    return [
      'name' => 'required|min:3|max:255',
      'username' => 'required|min:3|max:255|alpha_num|unique:users',
      'email' => 'required|email|unique:users',
      'picture.*' => 'required|image',
      'phone' => 'required|unique:admins|regex:' . PHONE_REGEX,
    ];
  }
}
