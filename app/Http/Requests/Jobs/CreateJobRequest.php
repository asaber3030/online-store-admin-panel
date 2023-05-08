<?php

namespace App\Http\Requests\Jobs;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateJobRequest extends FormRequest
{

  public function authorize() {
    return Auth::guard('admin')->check();
  }


  public function rules() {
    return [
      'title' => 'required|min:3|max:255',
      'description' => 'required',
      'location' => 'required',
      'salary' => 'required|integer',
      'contract_type' => 'required|in:0,1',
      'category' => 'required|exists:categories,id',
      'sub_category' => 'required|exists:sub_categories,id',
    ];
  }
}
