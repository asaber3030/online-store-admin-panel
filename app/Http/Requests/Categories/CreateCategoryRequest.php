<?php

namespace App\Http\Requests\Categories;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateCategoryRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize() {
    return Auth::guard('admin')->check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules() {
    return [
      'name' => 'required|max:255|min:3',
      'icon' => 'required|mimes:png,jpg,jpeg',
      'icon.*' => 'required|mimes:png,jpg,jpeg',
      'keywords' => 'required|min:20|max:255',
      'type' => 'required|in:0,1,2'
    ];
  }
}
