<?php

    namespace App\Filament\Resources;

    use App\Enums\RolesEnum;
    use App\Filament\Resources\OrderResource\Pages;
    use App\Models\Order;
    use Filament\Facades\Filament;
    use Filament\Forms;
    use Filament\Forms\Form;
    use Filament\Resources\Resource;
    use Filament\Tables;
    use Filament\Tables\Table;
    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Support\Facades\Auth;

    class OrderResource extends Resource
    {
        protected static ?string $model = Order::class;
        protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
        protected static ?string $label = 'ការបញ្ជាទិញ';
        protected static ?int $navigationSort = 2;

        public static function form(Form $form): Form
        {
            return $form
                ->schema([
                    Forms\Components\Section::make('ព័ត៌មានការបញ្ជាទិញ')
                        ->schema([
                            Forms\Components\TextInput::make('id')
                                ->label('លេខការបញ្ជាទិញ')
                                ->disabled(),
                            Forms\Components\TextInput::make('total_price')
                                ->label('តម្លៃសរុប')
                                ->disabled()
                                ->prefix('$'),
                            Forms\Components\TextInput::make('status')
                                ->label('ស្ថានភាព')
                                ->disabled(),
                            Forms\Components\DateTimePicker::make('created_at')
                                ->disabled()
                                ->label('កាលបរិច្ឆេទបញ្ជាទិញ'),
                        ]),

                    Forms\Components\Section::make('ព័ត៌មានការដឹកជញ្ជូន')
                        ->schema([
                            Forms\Components\TextInput::make('recipient_name')
                                ->label('អ្នកទទួល')
                                ->disabled(),
                            Forms\Components\TextInput::make('street')
                                ->label('ផ្លូវលេខ')
                                ->disabled(),
                            Forms\Components\TextInput::make('city')
                                ->label('ស្រុក/ខណ្ឌ')
                                ->disabled(),
                            Forms\Components\TextInput::make('county')
                                ->label('ខេត្ត/ក្រុង')
                                ->disabled(),
                            Forms\Components\TextInput::make('phone')
                                ->label('លេខទូរស័ព្ទ')
                                ->disabled(),
                            Forms\Components\Select::make('delivery_status')
                                ->label('ស្ថានភាពការដឹកជញ្ជូន')
                                ->options([
                                    'Pending' => 'រង់ចាំ',
                                    'Packing' => 'វេចខ្ចប់',
                                    'Shipping' => 'ដឹកជញ្ជូន',
                                    'Received' => 'ដល់ទីតាំង',
                                ])
                                ->required(),
                            Forms\Components\TextInput::make('deliver_phone')
                                ->label('Delivery Phone Number')
                                ->required(fn ($get): bool => in_array($get('delivery_status'), ['Shipping', 'Received']))
                                ->visible(fn ($get): bool => in_array($get('delivery_status'), ['Shipping', 'Received'])),
                        ]),
                ]);
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    Tables\Columns\TextColumn::make('id')
                        ->label('លេខការបញ្ជាទិញ')
                        ->searchable()
                        ->sortable(),
                    Tables\Columns\TextColumn::make('created_at')
                        ->label('កាលបរិច្ឆេទបញ្ជាទិញ')
                        ->dateTime()
                        ->sortable(),
                    Tables\Columns\TextColumn::make('user.name')
                        ->label('អ្នកទិញ')
                        ->searchable(),
                    Tables\Columns\TextColumn::make('recipient_name')
                        ->label('អ្នកទទួល')
                        ->searchable(),
                    Tables\Columns\TextColumn::make('total_price')
                        ->label('តម្លៃសរុប')
                        ->money('USD')
                        ->sortable(),
                    Tables\Columns\BadgeColumn::make('status')
                        ->label('ស្ថានភាព')
                        ->sortable()
                        ->colors([
                            'success' => 'Completed',
                            'warning' => 'Processing',
                            'danger' => 'Failed',
                        ]),
                    Tables\Columns\BadgeColumn::make('delivery_status')
                        ->label('ស្ថានភាពការដឹកជញ្ជូន')
                        ->colors([
                            'gray' => 'រង់ចាំ',
                            'blue' => 'វេចខ្ចប់',
                            'yellow' => 'ដឹកជញ្ជូន',
                            'green' => 'ដល់ទីតាំង',
                        ]),
                ])
                ->filters([
                    // Add filters as needed
                ])
                ->actions([
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
                ->bulkActions([
                    Tables\Actions\BulkActionGroup::make([
                        // Add bulk actions if needed
                    ]),
                ]);
        }

        public static function getRelations(): array
        {
            return [
                // Add relations if needed
            ];
        }

        public static function getPages(): array
        {
            return [
                'index' => Pages\ListOrders::route('/'),
                'create' => Pages\CreateOrder::route('/create'),
                'view' => Pages\ViewOrder::route('/{record}'),
                'edit' => Pages\EditOrder::route('/{record}/edit'),
            ];
        }
        public static function canViewAny(): bool
        {
            $user =  Filament::auth()->user();
            return $user->hasRole(RolesEnum::Vendor);
        }

        public static function getEloquentQuery(): Builder
        {
            // If user is vendor, only show their orders
            if (Auth::user()->hasRole('Vendor')) {
                return parent::getEloquentQuery()
                    ->where('vendor_user_id', Auth::id());
            }

            return parent::getEloquentQuery();
        }
    }
