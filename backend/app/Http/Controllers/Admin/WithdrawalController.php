<?php

namespace App\Http\Controllers\Admin;

use Illuminate\View\View;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class WithdrawalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $withdrawals = Withdrawal::with('seller')->latest()->get();
        return view('admin.withdrawals.index', compact('withdrawals'));
    }

    /**
     * Change withdrawal status
     *
     * @param Withdrawal $withdrawal
     * @param [type] $status
     * @return RedirectResponse
     */
    public function updateWithdrawalStatus(Withdrawal $withdrawal, $status): RedirectResponse
    {
        $withdrawal->update([
            'status' => $status
        ]);

        if($status === 'approved') {
            return to_route('withdrawals.index')->with('success', 'Withdrawal approved successfully.');
        }else {
            return to_route('withdrawals.index')->with('error', 'Withdrawal rejected successfully.');
        }
    }
}
