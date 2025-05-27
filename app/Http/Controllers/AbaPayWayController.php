<?php
//
//namespace App\Http\Controllers;
//
//use App\Services\PayWayService;
//use Illuminate\Http\Request;
//
//class AbaPayWayController extends Controller
//{
//    protected $payWayService;
//
//
//
//    public function __construct(PayWayService $payWayService)
//    {
//        $this->payWayService = $payWayService;
//    }
//
//    public function ShowCheck()
//    {
//        $req_time = date('YmdHis');;
//        $transactionId = $req_time;
//        $amount = '100.00';
//        $type = 'purchase';
//        $currency = 'USD';
//        $payment_option = 'cards';
//        $merchant_id = config('app.merchant_id');
//
//        $hash = $this->payWayService->getHash(
//            $req_time . $merchant_id . $transactionId . $amount. $type . $payment_option . $currency
//        );
//
//        return view('checkout', compact(
//            'hash', 'transactionId', 'amount', 'merchant_id', 'req_time', 'type', 'payment_option', 'currency'
//        ));
//    }
//
//}
