<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model
{
    protected $fillable = [
        'title', 'slug', 'user_id', 'category_id',
        'description', 'file_path', 'price', 'status', 'downloads'
    ];

    protected $appends = ['width', 'height', 'extension'];

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault([
            'name' => 'N/A'
        ]);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class)->withDefault([
            'name' => 'Uncategorized'
        ]);
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->where('approved', 1);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getWidthAttribute(): ?string
    {
        if(file_exists(public_path($this->file_path))) {
          [$width, $height] = getimagesize(public_path($this->file_path));
          return $width;
        }
        return null;
    }

    public function getHeightAttribute(): ?string
    {
        if(file_exists(public_path($this->file_path))) {
          [$width, $height] = getimagesize(public_path($this->file_path));
          return $height;
        }
        return null;
    }

    public function getExtensionAttribute(): string
    {
        return pathinfo($this->file_path, PATHINFO_EXTENSION);
    }
}
