<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('jobfair_recruitment_attendees', function (Blueprint $table) {
            // Add the qr_token column
            $table->string('qr_token', 255)->after('applicant_profile_id');

            // Add composite unique key: recruitment_activity_id + qr_token
            $table->unique(['recruitment_activity_id', 'qr_token'], 'unique_activity_qr');
        });
    }

    public function down(): void
    {
        Schema::table('jobfair_recruitment_attendees', function (Blueprint $table) {
            $table->dropUnique('unique_activity_qr');
            $table->dropColumn('qr_token');
        });
    }
};
