<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Order;

class AdminIncomeWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $useractive = User::count('id');
        $totalincome = Order::where('status', 'paid')->sum('total_price');
        $comission = Order::sum('website_commission');
        return [
            Stat::make('អ្នកប្រើប្រាស់សរុប', $useractive . ' នាក់')
                ->icon('heroicon-o-user-group')
                ->color('primary'),
            Stat::make('Platform Commission', '$' . number_format($comission, 2))
                ->icon('heroicon-o-currency-dollar')
                ->color('success'),
            Stat::make('ចំណូលសរុប', '$' . number_format($totalincome, 2))
                ->icon('heroicon-o-currency-dollar')
                ->color('success'),
        ];
    }

    public static function canView(): bool
    {
        $user = auth()->user();
        return $user->hasRole(\App\Enums\RolesEnum::Admin);
    }
}
