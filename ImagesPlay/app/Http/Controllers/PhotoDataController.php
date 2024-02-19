<?php

namespace App\Http\Controllers;

use App\Models\PhotoData;
use Illuminate\Http\Request;

class PhotoDataController extends Controller
{

    public function index(Request $request){
        return view('image');
        
    }
    public function store(Request $request){
        echo "helloooooooooooo";
        $this->validate($request, [
            'image'=> 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);
        $image_path = $request->file('image')->store('image','public');
        $data = PhotoData::create([
            'image'=> $image_path,
        ]);
        
        session()->flash('success', 'Image Upload successfully');

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'image' => $image_path, 
        ]);
    }
}
