<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate([
            'full_name' => 'Admin Adminov',
            'email'     => 'admin@gmail.com',
            'password'  => 'vSRmCUbnM82r5D3avY3ZWEshn6T5Dw4PJWeRQ8jyqGbmLw76urXpUK4Lvf3gcPEeGzZ9AruKQqDW36gd',
            'phone'     => '+992000000000',
        ]);

        $admin->assignRole(Role::where('name', Role::ADMIN)->first());
    }
}
