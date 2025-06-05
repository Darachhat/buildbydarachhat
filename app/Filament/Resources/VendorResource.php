<?php

namespace App\Filament\Resources;

use App\Enums\RolesEnum;
use App\Filament\Resources\VendorResource\Pages;
use App\Models\Vendor;
use Filament\Facades\Filament;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms;
use Filament\Tables\Columns\TextColumn;

class VendorResource extends Resource
{
    protected static ?string $model = Vendor::class;
    protected static ?string $label = 'អ្នកលក់';
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('user_id')->label('ID')->sortable()->searchable(),
                // Vendor's personal name (user name)
                TextColumn::make('user.name')
                    ->label('ឈ្មោះ')
                    ->searchable(),

                TextColumn::make('store_name')
                    ->label('ហាងឈ្មោះ')
                    ->searchable(),

                TextColumn::make('telegram_link')
                    ->label('តំណរតេលេក្រាម')
                    ->url(fn ($record) => $record->telegram_link, true)
                    ->openUrlInNewTab()
                    ->limit(30),

                TextColumn::make('store_address')
                    ->label('ទីតាំងហាង')
                    ->limit(40),

                // Count products for each vendor (by user relation)
                TextColumn::make('products_count')
                    ->label('ទំនីញសរុប')
                    ->getStateUsing(
                        fn(Vendor $vendor) => $vendor->user && $vendor->user->products ? $vendor->user->products->count() : 0
                    ),

                // Total vendor income: sum of vendor_subtotal from Orders
                TextColumn::make('total_income')
                    ->label('ចំណូលសរុប')
                    ->getStateUsing(
                        fn(Vendor $vendor) => '$' . number_format(
                                \App\Models\Order::where('vendor_user_id', $vendor->user_id)
                                    ->sum('vendor_subtotal'), 2)
                    ),
            ])
            ->defaultSort('user_id', 'desc')
            ->filters([
                // (Add soft delete/status filters if desired)
            ])
            ->actions([
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('store_name')->required(),
            Forms\Components\TextInput::make('telegram_link')->url(),
            Forms\Components\TextInput::make('store_address'),
            // Add other vendor fields as appropriate
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListVendors::route('/'),

            'edit'   => Pages\EditVendor::route('/{record}/edit'),
        ];
    }
    public static function canViewAny(): bool
    {
        $user =  Filament::auth()->user();
        return $user->hasRole(RolesEnum::Admin);
    }
}
