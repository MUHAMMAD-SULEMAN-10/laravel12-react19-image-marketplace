@extends('admin.layouts.app')

@section('title')
    Images
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <h3 class="my-3">
                Images
            </h3>
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
                                            <th scope="col">Image</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">By</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Downloads</th>
                                            <th scope="col">Added</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($images as $key => $image)
                                            <tr class="">
                                                <td scope="row">
                                                    {{ $key += 1 }}
                                                </td>
                                                <td>
                                                    <img 
                                                        src="{{asset($image->file_path)}}" 
                                                        alt={{$image->title}}
                                                        class="img-fluid rounded"
                                                        height="60"
                                                        width="60"
                                                    />
                                                </td>
                                                <td>
                                                    {{ $image->title }}
                                                </td>
                                                <td>
                                                    {{ $image->category->name }}
                                                </td>
                                                <td>
                                                    {{ $image->seller->name }}
                                                </td>
                                                <td>
                                                    ${{ $image->price }}
                                                </td>
                                                <td>
                                                    @if ($image->status === 'approved')
                                                        <span class="badge bg-success">
                                                            Approved
                                                        </span>
                                                    @elseif($image->status === 'rejected')
                                                        <span class="badge bg-danger">
                                                            Rejected
                                                        </span>
                                                    @else
                                                        <span class="badge bg-primary">
                                                            Pending
                                                        </span>
                                                    @endif
                                                </td>
                                                <td>
                                                    {{ $image->downloads }}
                                                </td>
                                                <td>
                                                    {{ $image->created_at->diffForHumans() }}
                                                </td>
                                                <td>
                                                     @if ($image->status === 'approved')
                                                        <a href="{{route('image.update', ['image' => $image->slug, 'status' => 'rejected'])}}" class="btn btn-sm btn-warning mb-1">
                                                            <i class="fas fa-eye-slash"></i>
                                                        </a>
                                                    @endif
                                                    @if ($image->status === 'rejected')
                                                        <a href="{{route('image.update', ['image' => $image->slug, 'status' => 'approved'])}}" class="btn btn-sm btn-success mb-1">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                    @endif
                                                    @if ($image->status === 'pending')
                                                        <a href="{{route('image.update', ['image' => $image->slug, 'status' => 'approved'])}}" class="btn btn-sm btn-success mb-1">
                                                            <i class="fas fa-check"></i>
                                                        </a>
                                                        <a href="{{route('image.update', ['image' => $image->slug, 'status' => 'rejected'])}}" class="btn btn-sm btn-danger mb-1">
                                                            <i class="fas fa-times"></i>
                                                        </a>
                                                    @endif
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