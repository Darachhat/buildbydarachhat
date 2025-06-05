<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Order;

class VendorIncomeWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $income = Order::where('vendor_user_id', auth()->id())->sum('vendor_subtotal');
        $order = Order::where('vendor_user_id', auth()->id())->count('vendor_subtotal');
        return [
            Stat::make('ចំណួលសរុបរបស់អ្នក', '$' . number_format($income, 2))
                ->icon('heroicon-o-currency-dollar')
                ->color('success'),
            Stat::make('ចំនួនការបញ្ជារទិញរបស់អ្នក', number_format($order) . ' នាក់')
                ->icon('heroicon-o-currency-dollar')
                ->color('success'),
        ];
    }

    public static function canView(): bool
    {
        $user = auth()->user();
        return $user && $user->hasRole(\App\Enums\RolesEnum::Vendor);
    }
}
