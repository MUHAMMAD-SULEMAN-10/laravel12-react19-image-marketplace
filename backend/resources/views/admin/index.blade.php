@extends('admin.layouts.app')

@section('title')
    Dashboard
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-4">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-8">
            <div class="container">
                <div class="row ">
                    <div class="col-xl-6 col-lg-6">
                        <div class="card dashboard_card l-bg-blue-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large">
                                    <i class="fa-solid fa-image"></i>
                                </div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Images</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            <!-- total of images here -->
                                            {{ $total_images }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="card dashboard_card l-bg-orange-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large">
                                    <i class="fa-solid fa-users"></i>
                                </div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Users</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            <!-- total of users here -->
                                            {{ $total_users }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="card dashboard_card l-bg-green-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large">
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Reviews</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            <!-- total of reviews here -->
                                            {{ $total_reviews }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="card dashboard_card l-bg-pink-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large">
                                    <i class="fa-solid fa-solid fa-receipt"></i>
                                </div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Purchases</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            <!-- total of purchases here -->
                                            {{ $total_purchases }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="card dashboard_card l-bg-yellow-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large">
                                    <i class="fa-solid fa-solid fa-money-bill-wave"></i>
                                </div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Earnings</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            <!-- total of earnings here -->
                                            ${{ $total_earnings }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="card dashboard_card l-bg-red-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large">
                                    <i class="fa-solid fa-solid fa-percent"></i>
                                </div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Commissions</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            <!-- total of commissions here -->
                                            ${{ $total_commission }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection