<?php

namespace AddressFinder\AddressFinder\Test\Unit\Model;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Directory\Api\CountryInformationAcquirerInterface;
use Magento\Directory\Api\Data\CountryInformationInterface;
use Magento\Directory\Api\Data\RegionInformationInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class StateMappingProviderTest extends TestCase
{
    /** @var MockObject|CountryInformationAcquirerInterface */
    private $informationAcquirer;

    /** @var MockObject|CountryInformationInterface */
    private $countryInformation;

    protected function setUp(): void
    {
        parent::setUp();

        $this->informationAcquirer = $this->getMockBuilder(CountryInformationAcquirerInterface::class)
            ->getMock();

        $this->countryInformation = $this->getMockBuilder(CountryInformationInterface::class)
            ->getMock();
    }

    /** @test */
    public function it_throws_an_exception_where_no_regions_exist(): void
    {
        $provider = new StateMappingProvider($this->informationAcquirer);

        $this->informationAcquirer
            ->expects(self::once())
            ->method('getCountryInfo')
            ->with('AU')
            ->willReturn($this->countryInformation);

        $this->countryInformation
            ->expects(self::once())
            ->method('getAvailableRegions')
            ->willReturn(null);

        $this->expectException(NoStateMappingsException::class);

        $provider->forCountry('AU');
    }

    /** @test */
    public function it_finds_mappings_successfully(): void
    {
        $provider = new StateMappingProvider($this->informationAcquirer);

        $this->informationAcquirer
            ->expects(self::once())
            ->method('getCountryInfo')
            ->with('AU')
            ->willReturn($this->countryInformation);

        $regionBuilder = $this->getMockBuilder(RegionInformationInterface::class);

        $this->countryInformation
            ->expects(self::once())
            ->method('getAvailableRegions')
            ->willReturn([
                $region1 = $regionBuilder->getMock(),
                $region2 = $regionBuilder->getMock(),
            ]);

        $region1->expects(self::once())->method('getCode')->willReturn('NSW');
        $region1->expects(self::once())->method('getId')->willReturn(1);

        $region2->expects(self::once())->method('getCode')->willReturn('WA');
        $region2->expects(self::once())->method('getId')->willReturn(2);

        $expected = ['NSW' => 1, 'WA' => 2];

        self::assertInternalType('array', $mappings = $provider->forCountry('AU'));
        self::assertCount(count($expected), $mappings);
        self::assertEquals($expected, $mappings);
    }

}
