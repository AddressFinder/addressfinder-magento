<?php

namespace AddressFinder\AddressFinder\Block;

class Checkout extends AbstractBlock
{
    /**
     * {@inheritdoc}
     */
    protected function _prepareLayout()
    {
        if (!$this->getTemplate()) {
            $this->setTemplate('checkout.phtml');
        }

        return parent::_prepareLayout();
    }
}
