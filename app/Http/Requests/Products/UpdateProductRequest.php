<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProductRequest extends FormRequest
{
  public function authorize() {
    return Auth::guard('admin')->check();
  }

  public function rules() {
    return [
      'name' => 'required|min:10|max:100',
      'description' => 'required',
      'category' => 'required|exists:categories,id',
      'sub_category' => 'required|exists:sub_categories,id',
      'price' => 'required|integer|gt:0',

    ];
  }
}
