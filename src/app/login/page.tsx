'use client'
//import { useState, useEffect} from 'react';
import React from 'react';
import '../../../src/app/styles.scss';
import { Grid, Row, Column, TextInput, Tile, Button } from '@carbon/react';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
    return (
        <Grid className={'login-page '}>
            <Column lg={16} sm={4} md={8} >
                <Column lg={16} sm={4} md={8}>
                    <div className={'app-header'}>
                        Task Management
                    </div>
                </Column>
                <Column lg={{ span: 16 }} sm={4} md={{ span: 8 }}>
                    <div className={'app-caption'}>
                        Stay Organized, Stay Ahead; Manage Your Tasks With Ease
                    </div>
                </Column>

                <div className="cds--row">
                    <div className="cds--offset-lg-4 cds--col-lg-12 cds--offset-md-4 cds--col-md-4 cds--col-sm-4">
                        <div className="sub-heading">Secure task management for Professionals</div>
                    </div>
                </div>
                <div className="cds--row">
                    <div className="cds--offset-lg-6 cds--col-lg-10 cds--offset-md-4 cds--col-md-4 cds--col-sm-4">
                        <Button size={'sm'} className={'sign-in'}>
                            <div className='$icon-on-color' style={{ paddingRight: '2vh' }}>
                                <GoogleIcon />

                            </div>
                            <div className='$body-compact-02'>
                                Login with Google
                            </div>

                        </Button>

                    </div>
                </div>

                <div className='cds--row' style={{marginTop:'5vh'}}>
                    <div className="cds--col-lg-5 cds--col-md-4 cds--col-sm-4">
                        <Tile className={'individual-task'}>
                            <div className={'tile-header'}>
                               Secure
                            </div>

                        </Tile>

                    </div>
                    <div className="cds--col-lg-5 cds--col-md-4 cds--col-sm-4">
                        <Tile className={'individual-task'}>
                        <div className={'tile-header'}>
                               Complaince
                            </div>

                        </Tile>

                    </div>
                    <div className="cds--col-lg-5 cds--col-md-4 cds--col-sm-4">
                        <Tile className={'individual-task'}>
                        <div className={'tile-header'}>
                               Effective
                        </div>

                        </Tile>

                    </div>
                </div>

                <div className='cds--row' style={{marginTop:'5vh'}}>
                    <div className="cds--offset-lg-4 cds--col-lg-10 cds-offset-md-4 cds--col-md-4 cds--col-sm-4">
                        <div className='description-heading'>
                        The Need for Task Management
                        </div>
                    </div>
                </div>

                <div className='cds--row' style={{marginTop:'5vh'}}>
                    <div className="cds--offset-lg-1 cds--col-lg-14 cds-offset-md-1 cds--col-md-6 cds--col-sm-4">
                        <div className={'app-description'}>
                            Task management is the link between planning to do something and getting it done.
                            Your task management software should provide an overview of work in progress that enables tracking from conception to completion.
                            Let&apos;s get organized together&apos! Whether you&apos;re managing your next big project or digitalizing task management for your team&apos;s daily business, 
                            you need to know who&apos;s doing what, when. MeisterTask helps you manage tasks in a beautiful, customizable environment that perfectly adapts to your needs.
                        </div>
                    </div>
                </div>

            </Column>


        </Grid>
    )
}
