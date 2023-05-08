<?php

namespace App\Http\Requests\Companies;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateCompanyRequest extends FormRequest
{
  public function authorize() {
    return Auth::guard('admin')->check();
  }

  public function rules() {
    return [
      'name' => 'required|min:5|max:255',
      'title' => 'required|min:5|max:255',
      'about' => 'required|min:100|max:1500',
      'website' => 'required|url',
      'facebook' => 'required|url',
      'type' => 'required|in:0,1,2',
      'email' => 'required|email|max:255|unique:companies,id',
      'phone' => 'required|regex:/^01[0125][0-9]{8}$/u|unique:companies,id',
    ];
  }
}
