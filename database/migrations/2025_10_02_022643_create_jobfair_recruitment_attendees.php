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
        Schema::create('jobfair_recruitment_attendees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recruitment_activity_id'); 
            $table->unsignedBigInteger('applicant_profile_id');
            $table->string('status')->default('pending');
            $table->timestamps();

            // Foreign keys
            $table->foreign('recruitment_activity_id')
                  ->references('id')
                  ->on('recruitment_activities')
                  ->onDelete('cascade');

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
        Schema::dropIfExists('jobfair_recruitment_attendees');
    }
};
