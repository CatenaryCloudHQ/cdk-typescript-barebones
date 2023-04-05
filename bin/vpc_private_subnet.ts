#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { VpcPrivateSubnetStack } from '../lib/vpc_private_subnet_stack';

const app = new App();
new VpcPrivateSubnetStack(app, 'VpcPrivateSubnetStack');
