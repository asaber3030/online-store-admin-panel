<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\RequiredForImport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ImportController extends Controller {

  private $companiesErrors = [];

  // Main Page
  public function importMainPage() {

    $newTableNames = [];

    foreach (RequiredForImport::tables() as $table) {
      $newTableNames[] = Str::title($table);
    }

    return inertia('Admin/Import/ImportMain', [
      'getImportingData' => $newTableNames
    ]);
  }

  # Companies Import #
  function importCompanies() {
    $requiredColumns = RequiredForImport::getColumns('companies');

    return inertia('Admin/Import/Companies/ImportCompanies', [
      'columns' => $requiredColumns,
      'tableName' => 'companies',
    ]);

  }
  function importCompaniesAction(Request $request) {

    $request->validate([
      'file.*' => 'required|mimes:csv'
    ]);

    $fileHeaders = '';

    if ($request->hasFile('file')) {

      $file = $request->file('file');
      $csvFile = generateFileName() . $file->getClientOriginalExtension();

      $file->move(IMPORTING_ROUTE, $csvFile);

      $mainFile = IMPORTING_ROUTE . $csvFile;

      $fileHeaders = getCSVHeader($mainFile);
    }

    $cols = RequiredForImport::getColumns('companies');
    $requiredColumns = [];

    foreach ($cols as $col) {
      $requiredColumns[] = $col['column'];
    }

    $companiesData = csvToArray($mainFile);

    $validator = Validator::make($companiesData, [
      'title' => 'required',
      'logo' => 'required',
    ]);

//    foreach ($companiesData as $key => $value) {
//      Company::create([
//        'name' => $value['name'],
//        'user' => $value['user'],
//        'email' => $value['email'],
//        'type' => $value['type'],
//        'phone' => $value['phone'],
//        'website' => $value['website'],
//        'facebook' => $value['facebook'],
//      ]);
//
//      message(count($csvData) . ' companies has been added successfully! Redirecting...');
//      return to_route('admin.com.list');
//    }

  }

}
