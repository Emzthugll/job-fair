<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('applicant_profile_job_preference', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('applicant_profile_id'); 
        $table->string('employment')->nullable();
        $table->string('preferred_job')->nullable();
        $table->timestamps();

        $table->foreign('applicant_profile_id')
                  ->references('id')
                  ->on('applicant_profiles')
                  ->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_profile_job_preference');
    }
};
