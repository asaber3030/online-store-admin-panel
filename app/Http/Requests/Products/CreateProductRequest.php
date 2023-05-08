<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CreateProductRequest extends FormRequest {

  public function authorize() {
    return Auth::guard('admin')->check();
  }

  public function rules() {
    return [
      'name' => 'required|min:10|max:100',
      'description' => 'required',
      'user' => 'required|exists:users,id',
      'category' => 'required|exists:categories,id',
      'sub_category' => 'required|exists:sub_categories,id',
      'price' => 'required|integer|gt:0',
      'image' => 'required|mimes:jpg,png,jpeg,svg',
      'image.*' => 'required|mimes:jpg,png,jpeg,svg',
    ];
  }
}
