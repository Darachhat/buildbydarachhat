<x-filament-panels::page>
    <style>
        /* Custom green theme styles */
        .fi-header {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-bottom: 2px solid #bbf7d0;
        }

        .fi-sidebar {
            background: linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%);
        }

        .fi-main {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }

        /* Widget styling */
        .fi-wi-widget {
            background: white;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.1);
            transition: all 0.3s ease;
        }

        .fi-wi-widget:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px -3px rgba(34, 197, 94, 0.2);
            border-color: #86efac;
        }

        /* Action button styling */
        .fi-btn-success {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            border: none;
            transition: all 0.3s ease;
        }

        .fi-btn-success:hover {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(34, 197, 94, 0.3);
        }

        /* Navigation styling */
        .fi-sidebar-nav-item-active {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
        }

        /* Real-time clock styling */
        .ecosystem-clock {
            font-family: 'Courier New', monospace;
            font-weight: bold;
            color: #15803d;
            font-size: 0.875rem;
        }

        /* Welcome message styling */
        .ecosystem-welcome {
            font-family: 'Khmer OS', sans-serif;
            color: #166534;
        }

        /* Animation for widgets */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fi-wi-widget {
            animation: fadeIn 0.6s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f0fdf4;
        }

        ::-webkit-scrollbar-thumb {
            background: #22c55e;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #16a34a;
        }
    </style>

    <!-- Dashboard Header Info -->
    <div class="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- System Status -->
            <div class="bg-white rounded-lg p-4 border border-green-200 text-center">
                <div class="text-2xl mb-2">🌿</div>
                <h3 class="font-bold text-green-800">EcoSystem Status</h3>
                <p class="text-sm text-green-600">ស្ថានភាពប្រព័ន្ធ</p>
                <div class="mt-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        🟢 Online / លំហូរល្អ
                    </span>
                </div>
            </div>

            <!-- Current Time -->
            <div class="bg-white rounded-lg p-4 border border-green-200 text-center">
                <div class="text-2xl mb-2">📅</div>
                <h3 class="font-bold text-green-800">Current Time</h3>
                <p class="text-sm text-green-600">ពេលវេលាបច្ចុប្បន្ន</p>
                <div class="mt-2">
                    <p class="ecosystem-clock">{{ now()->utc()->format('Y-m-d H:i:s') }}</p>
                    <p class="text-xs text-green-600">UTC Format</p>
                </div>
            </div>

            <!-- User Info -->
            <div class="bg-white rounded-lg p-4 border border-green-200 text-center">
                <div class="text-2xl mb-2">👤</div>
                <h3 class="font-bold text-green-800">Current User</h3>
                <p class="text-sm text-green-600">អ្នកប្រើប្រាស់បច្ចុប្បន្ន</p>
                <div class="mt-2">
                    <p class="font-medium text-green-800">Darachhat 🌱</p>
                    <p class="text-xs text-green-600">Administrator</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-6 bg-white rounded-lg p-4 border border-green-200">
        <h3 class="text-lg font-bold text-green-800 mb-4 flex items-center">
            <span class="mr-2">⚡</span>
            Quick Actions / សកម្មភាពរហ័ស
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#" class="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <span class="text-2xl mb-1">📊</span>
                <span class="text-sm font-medium text-green-800">Analytics</span>
                <span class="text-xs text-green-600">ការវិភាគ</span>
            </a>
            <a href="#" class="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <span class="text-2xl mb-1">🛒</span>
                <span class="text-sm font-medium text-green-800">Orders</span>
                <span class="text-xs text-green-600">ការកម្មង់</span>
            </a>
            <a href="#" class="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <span class="text-2xl mb-1">📦</span>
                <span class="text-sm font-medium text-green-800">Products</span>
                <span class="text-xs text-green-600">ផលិតផល</span>
            </a>
            <a href="#" class="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <span class="text-2xl mb-1">👥</span>
                <span class="text-sm font-medium text-green-800">Users</span>
                <span class="text-xs text-green-600">អ្នកប្រើប្រាស់</span>
            </a>
        </div>
    </div>

    <!-- Widgets Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        @foreach ($this->getVisibleWidgets() as $widget)
            @livewire($widget)
        @endforeach
    </div>

    <!-- Footer Info -->
    <div class="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 text-center">
        <p class="text-sm text-green-600 ecosystem-welcome">
            © ២០២៥ EcoSystem Platform - Crafted with 💚 for sustainable growth by Darachhat
        </p>
        <p class="text-xs text-green-500 mt-1">
            Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): {{ now()->utc()->format('Y-m-d H:i:s') }}
        </p>
    </div>

    <!-- Real-time clock update script -->
    <script>
        function updateClock() {
            const clocks = document.querySelectorAll('.ecosystem-clock');
            const now = new Date();
            const utcTime = now.getUTCFullYear() + '-' +
                String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
                String(now.getUTCDate()).padStart(2, '0') + ' ' +
                String(now.getUTCHours()).padStart(2, '0') + ':' +
                String(now.getUTCMinutes()).padStart(2, '0') + ':' +
                String(now.getUTCSeconds()).padStart(2, '0');

            clocks.forEach(clock => {
                clock.textContent = utcTime;
            });
        }

        // Update clock every second
        setInterval(updateClock, 1000);
        updateClock(); // Initial call
    </script>
</x-filament-panels::page>
