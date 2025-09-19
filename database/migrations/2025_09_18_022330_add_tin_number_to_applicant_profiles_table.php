<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applicant_profiles', function (Blueprint $table) {
            $table->string('tin_number', 20)->nullable()->after('disability'); 
        });
    }

public function down(): void
{
    Schema::table('applicant_profiles', function (Blueprint $table) {
        $table->dropColumn('tin_number');
    });
}

};
