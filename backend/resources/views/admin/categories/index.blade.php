@extends('admin.layouts.app')

@section('title')
    Categories
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="my-3">
                    Categories
                </h3>
                <a href="{{route('categories.create')}}" class="btn btn-sm btn-dark">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <hr>
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div
                                class="table-responsive"
                            >
                                <table
                                    class="table"
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($categories as $key => $category)
                                            <tr class="">
                                                <td scope="row">
                                                    {{ $key += 1 }}
                                                </td>
                                                <td>
                                                    {{ $category->name }}
                                                </td>
                                                <td>
                                                    <a href="{{route('categories.edit', $category->id)}}" class="btn btn-sm btn-warning mb-1">
                                                        <i class="fas fa-edit"></i>
                                                    </a>
                                                    <form id="{{$category->id}}" action="{{route('categories.destroy', $category->id)}}" method="post">
                                                        @csrf
                                                        @method('DELETE')
                                                    </form>
                                                    <a onclick="deleteItem({{$category->id}})" class="btn btn-sm btn-danger" href="#"
                                                    > 
                                                        <i class="fas fa-trash"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection