<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::all();
        return response()->json([
            'blogs' => $blogs
         ], 200);
    }

    public function updateStatus(Request $request, $id)
    {
    
        $blog = Blog::findOrFail($id);
        $blog->status = $blog->status === 'published' ? 'hidden' : 'published';
        $blog->save();
    
        return response()->json(['status' => $blog->status]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog = Blog::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'created_by' => Auth::id(), 
        ]);

        $blog->refresh();

        return response()->json(['blog' => $blog], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::with('creator')->findOrFail($id);
        return response()->json([
            'blog' => $blog->toArray() + [
                'creator' => $blog->creator ? $blog->creator->only(['id', 'email']) : null
            ]
        ]);        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'nullable|string|in:published,hidden',
        ]);

       
        $blog->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'status' => $validated['status'] ?? $blog->status,
        ]);

       
        return response()->json([
            'message' => 'Blog updated successfully',
            'blog' => $blog,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
    
        return response()->json(['message' => 'Blog archived successfully.']);
    }
}
