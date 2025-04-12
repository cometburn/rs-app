<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'status',
        'created_by',
    ];

    public function getStatusAttribute($value)
    {
        // Ensure no unintended changes to the 'status' attribute here
        return $value;
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
