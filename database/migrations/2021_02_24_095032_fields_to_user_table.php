<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FieldsToUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
			$table->string("First_Name",255);
			$table->string("Last_Name",255);
			$table->string("Title",255);
			$table->string("Company_name",255);
			$table->string("Company_address",255);
			$table->string("City",255);
			$table->string("Postcode",255);
			$table->string("Country",255);
			$table->string("Phone",255);
			
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
