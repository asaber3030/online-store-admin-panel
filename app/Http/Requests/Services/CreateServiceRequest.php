<?php

namespace App\Http\Requests\Services;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateServiceRequest extends FormRequest
{
  public function authorize() {
    return Auth::guard('admin')->check();
  }

  public function rules() {
    return [
      'name' => 'required|min:3|max:255',
      'details' => 'required|min:100|max:1000000',
      'salary' => 'required|integer',
      'salary_per_hour' => 'required|integer',
      'user' => 'required|exists:users,id',
      'category' => 'required|exists:categories,id',
      'sub_category' => 'required|exists:sub_categories,id',
    ];
  }
}
