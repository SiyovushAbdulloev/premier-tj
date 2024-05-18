<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    use HasFactory;

    public const ADMIN = 'admin';

    public const USER = 'user';

    protected $guard_name = 'api';

    protected $fillable = [
        'name',
        'guard_name',
    ];
}
