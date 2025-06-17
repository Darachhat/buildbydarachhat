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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('recipient_name')->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('county')->nullable();
            $table->string('phone')->nullable();
            $table->decimal('delivery_fee', 20, 4)->default(0);
            $table->string('delivery_status')->default('Pending');
            $table->string('deliver_phone')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'recipient_name', 'street', 'city', 'county', 'phone',
                'delivery_fee', 'delivery_status', 'deliver_phone'
            ]);
        });

    }
};
