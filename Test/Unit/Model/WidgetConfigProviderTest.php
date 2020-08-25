<?php

namespace AddressFinder\AddressFinder\Test\Unit\Model;

use AddressFinder\AddressFinder\Model\WidgetConfigProvider;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Store\Model\ScopeInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class WidgetConfigProviderTest extends TestCase
{
    /** @var MockObject|ScopeConfigInterface */
    private $scopeConfig;

    /** @var Json */
    private $json;

    /** @var MockObject|LoggerInterface */
    private $logger;

    /** @var WidgetConfigProvider */
    private $provider;

    protected function setUp(): void
    {
        parent::setUp();

        $this->scopeConfig = $this->getMockBuilder(ScopeConfigInterface::class)
            ->getMock();

        $this->json = new Json();

        $this->logger = $this->getMockBuilder(LoggerInterface::class)
            ->getMock();

        $this->provider = new WidgetConfigProvider(
            $this->scopeConfig,
            $this->json,
            $this->logger
        );
    }

    /** @test */
    public function it_gets_the_license_key()
    {
        $this->scopeConfig
            ->expects(self::once())
            ->method('getValue')
            ->with('addressfinder/general/licence_key', ScopeInterface::SCOPE_STORE)
            ->willReturn($license = 'foo');

        self::assertEquals($license, $this->provider->getLicenceKey());
    }

    public function sample_widget_options(): array
    {
        return [
            [
                '{"foo":"bar"}',
                ['foo' => 'bar'],
            ],
            [
                '"foo"',
                'foo',
            ],
            [
                '1',
                1,
            ],
            [
                null,
                null,
            ],
            [
                '',
                null,
            ]
        ];
    }

    /**
     * @test
     *
     * @dataProvider sample_widget_options
     */
    public function it_gets_widget_options($encoded, $expected)
    {
        $this->scopeConfig
            ->expects(self::once())
            ->method('getValue')
            ->with('addressfinder/general/widget_options', ScopeInterface::SCOPE_STORE)
            ->willReturn($encoded);

        self::assertEquals($expected, $this->provider->getWidgetOptions());
    }

    /** @test */
    public function it_catches_exceptions_and_logs_errors()
    {
        $this->scopeConfig
            ->expects(self::once())
            ->method('getValue')
            ->with('addressfinder/general/widget_options', ScopeInterface::SCOPE_STORE)
            ->willReturn($invalid = '{"invalid json');

        $this->logger
            ->expects(self::once())
            ->method('warning')
            ->with('Failed to decode AddressFinder widget options: "Unable to unserialize value. Error: Control character error, possibly incorrectly encoded"');

        self::assertNull( $this->provider->getWidgetOptions());
    }
}
