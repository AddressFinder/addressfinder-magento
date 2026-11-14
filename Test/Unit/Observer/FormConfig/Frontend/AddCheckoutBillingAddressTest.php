<?php

namespace AddressFinder\AddressFinder\Test\Unit\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use AddressFinder\AddressFinder\Observer\FormConfig\Frontend\AddCheckoutBillingAddress;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\Data\Collection;
use Magento\Framework\Data\Collection\EntityFactoryInterface;
use Magento\Framework\Event;
use Magento\Framework\Event\Observer;
use Magento\Payment\Helper\Data as PaymentHelper;
use Magento\Payment\Model\MethodInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Quote\Model\Quote;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class AddCheckoutBillingAddressTest extends TestCase
{
    /** @var MockObject|FormConfigProvider */
    private $configProvider;

    /** @var MockObject|PaymentHelper */
    private $paymentHelper;

    /** @var MockObject|CheckoutSession */
    private $checkoutSession;

    /** @var MockObject|Quote */
    private $quote;

    /** @var AddCheckoutBillingAddress */
    private $observer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->configProvider = $this->createMock(FormConfigProvider::class);
        $this->configProvider->method('isFormEnabled')->willReturn(true);

        $this->paymentHelper = $this->createMock(PaymentHelper::class);
        $this->checkoutSession = $this->createMock(CheckoutSession::class);

        $this->quote = $this->createMock(Quote::class);
        $this->quote->method('getId')->willReturn(15);
        $this->quote->method('getStoreId')->willReturn(3);
        $this->checkoutSession->method('getQuote')->willReturn($this->quote);

        $this->observer = new AddCheckoutBillingAddress(
            $this->configProvider,
            $this->createMock(StateMappingProvider::class),
            $this->paymentHelper,
            $this->createMock(CartRepositoryInterface::class),
            $this->checkoutSession
        );
    }

    public function testAddsAFormForEachAvailablePaymentMethodUsingTheQuoteStore(): void
    {
        $method = $this->createMock(MethodInterface::class);
        $method->method('isAvailable')->with($this->quote)->willReturn(true);
        $method->method('getCode')->willReturn('checkmo');

        $this->paymentHelper
            ->expects(self::once())
            ->method('getStoreMethods')
            ->with(3, $this->quote)
            ->willReturn([$method]);

        self::assertSame(
            [
                'frontend.checkout.billing.address.checkmo',
                'frontend.checkout.billing.address.shared',
            ],
            $this->collectFormIds()
        );
    }

    public function testFallsBackToTheSharedFormWhenTheQuoteHasNoId(): void
    {
        $session = $this->createMock(CheckoutSession::class);
        $session->method('getQuote')->willReturn($this->createMock(Quote::class));

        $observer = new AddCheckoutBillingAddress(
            $this->configProvider,
            $this->createMock(StateMappingProvider::class),
            $this->paymentHelper,
            $this->createMock(CartRepositoryInterface::class),
            $session
        );

        $this->paymentHelper->expects(self::never())->method('getStoreMethods');

        self::assertSame(['frontend.checkout.billing.address.shared'], $this->collectFormIds($observer));
    }

    /**
     * @return string[]
     */
    private function collectFormIds(?AddCheckoutBillingAddress $observer = null): array
    {
        $forms = new Collection($this->createMock(EntityFactoryInterface::class));
        ($observer ?? $this->observer)->execute($this->makeEvent($forms));

        return array_keys($forms->getItems());
    }

    private function makeEvent(Collection $forms): Observer
    {
        return new Observer(['event' => new Event(['forms' => $forms])]);
    }
}
