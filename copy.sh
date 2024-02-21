#!/bin/bash

scp -r -P 5050 public/ routes/ app/ bootstrap/ config/ database/ storage/ tests/ vendor/ resources/ lclcom@lcl24.com:public_html