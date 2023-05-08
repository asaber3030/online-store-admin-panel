<?php

use App\Models\Admin;
use App\Models\StudentNotifications;

  const PHONE_REGEX = '/^01[0125][0-9]{8}$/u';

  function message($message, $type = 'success') {
    session()->flash('flashMessage', $message);
    session()->flash('flashMessageType', $type);
  }

  function admin() {
    return auth()->guard('admin')->user();
  }

  function activity($title, $icon, $url) {
    return Admin::saveActivity(
      title: $title,
      icon: $icon,
      url: $url
    );
  }

function array_equal($a, $b) {
  return (
    is_array($a)
    && is_array($b)
    && count($a) == count($b)
    && array_diff($a, $b) === array_diff($b, $a)
  );
}

function csvToArray($filename = '', $delimiter = ',') {
  if (!file_exists($filename) || !is_readable($filename))
    return false;

  $header = null;
  $data = array();
  if (($handle = fopen($filename, 'r')) !== false) {
    while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
      if (!$header)
        $header = $row;
      else
        $data[] = array_combine($header, $row);
    }
    fclose($handle);
  }
  return $data;
}

function getCSVHeader($filename, $delimiter = ',') {
  if (!file_exists($filename) || !is_readable($filename))
    return false;

  $header = null;
  if (($handle = fopen($filename, 'r')) !== false) {
    while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
      if (!$header)
        $header = $row;
    }
    fclose($handle);
  }
  return $header;
}
