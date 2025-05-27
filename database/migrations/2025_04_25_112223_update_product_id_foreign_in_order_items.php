<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Drop the existing foreign key first
            $table->dropForeign(['product_id']);

            // Add it again with cascade on delete
            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Drop the cascade foreign key
            $table->dropForeign(['product_id']);

            // Re-add without cascade (original behavior)
            $table->foreign('product_id')
                ->references('id')
                ->on('products');
        });
    }
};
