<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateUserRequest extends FormRequest
{

  public function authorize()
  {
    return Auth::guard('admin')->check();
  }
  public function rules()
  {
    return [
      'name' => 'required|min:3|max:255',
      'username' => 'required|min:3|max:255|alpha_num|unique:users',
      'email' => 'required|email|unique:users',
      'picture.*' => 'required|image',
      'national_id' => 'required|integer|digits:14|unique:users',
      'location' => 'required|url',
      'city' => 'required',
      'address' => 'required',
      'phone' => 'required|unique:users|regex:' . PHONE_REGEX,
      'verified' => 'required|in:0,1',
    ];
  }
}
