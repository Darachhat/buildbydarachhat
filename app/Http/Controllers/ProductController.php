<?php

namespace App\Http\Controllers;

// Import necessary resources and models
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Department;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display products on the homepage with optional keyword search.
     */
    public function home(Request $request)
    {
        $keyword = $request->query('keyword'); // Get search keyword from query string

        // Build product query with optional keyword filtering
        $products = Product::query()
            ->forWebsite() // Scope to filter products for public visibility
            ->when($keyword, function ($query, $keyword) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('title', 'lIKE', "%{$keyword}%") // Search in title
                    ->orWhere('description', 'LIKE', "%{$keyword}%"); // Or in description
                });
            })
            ->paginate(12); // Paginate with 12 products per page

        // Render Home page with paginated product list
        return Inertia::render('Home', [
            'products' => ProductListResource::collection($products) // Format products for frontend
        ]);
    }

    /**
     * Display the details of a single product.
     */
    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => new ProductResource($product), // Format product data
            'variationOptions' => request('options', []) // Optional selected variations (e.g., size/color)
        ]);
    }

    /**
     * Display products by department with optional keyword search.
     */
    public function byDepartment(Request $request, Department $department)
    {
        abort_unless($department->active, 404); // Ensure department is active

        $keyword = $request->query('keyword'); // Get keyword from query string

        // Query products by department
        $products = Product::query()
            ->forWebsite() // Public-facing products only
            ->where('department_id', $department->id)
            ->when($keyword, function ($query, $keyword) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('title', 'lIKE', "%{$keyword}%")
                        ->orWhere('description', 'LIKE', "%{$keyword}%");
                });
            })
            ->paginate(); // Default pagination

        // Render Department page with department info and product list
        return Inertia::render('Department/Index', [
            'department' => new DepartmentResource($department),
            'products' => ProductListResource::collection($products),
        ]);
    }
}
