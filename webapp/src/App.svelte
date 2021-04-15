<script>
    import { getCookie, setCookie } from './cookies.js'
    import Login from './Login.svelte'
    import D3Chart from './D3Chart.svelte'
    import D3DOMChart from './D3DOMChart.svelte'
    import VACLabVIS from './VACLabVIS.svelte'
    import {
        Content, Grid, Row, Column, Modal,
        SideNavDivider, SideNavItems, SideNav, SideNavLink, Header,
        SkipToContent, Tabs, Tab, TabContent
    } from "carbon-components-svelte";
    // Theme options: white, g10, g90, g100
    // import 'carbon-components-svelte/css/g10.css'
    import 'carbon-components-svelte/css/white.css'
	let count = 0;

    let isSideNavOpen = false;
    let isAboutModalOpen = false;
    let username = null;

    // Look for the user name in a cookie.  Use it if it exists.
    let username_cookie = getCookie("username");
    if (username_cookie.length > 0)
        username = username_cookie;
</script>

<Header company="VACLab" platformName="Bias Report" persistentHamburgerMenu={true} bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="About" on:click={() => {
        // Close the side menu.
        isSideNavOpen=false;

        // Show the modal about windows.
        isAboutModalOpen = true;
    }}/>
    <SideNavDivider />
    {#if username != null}
      <SideNavLink text="({ username }) Log out" on:click={() => {
          // Close the side menu.
          isSideNavOpen=false;
          // Clear the login info
          username = null;
          setCookie("username","",-1);
      }}/>
    {/if}
  </SideNavItems>
</SideNav>

<Content>
{#if username == null}
    <Grid><Row><Column>
        <Login on:submit={(d) => {
            console.log(d);
            username = d.detail.username;
            setCookie("username", username, 1);
            console.log('Also have password: ' + d.detail.password);
        }}>
        </Login>
    </Column></Row></Grid>
{:else}
    <Grid><Row><Column>
    <p>Count: {count}</p>
    <p>Half Count: {count/2}</p>
    <button on:click={() => {
        return count += 1;
    }}> + </button>

    <Tabs>
        <Tab label="D3 via SVG"/>
        <Tab label="D3 via DOM"/>
        <Tab label="VACLab VIS Dynamic Resize Test"/>
        <div slot="content">
            <TabContent>
                <D3Chart bind:count on:hover={d => console.log(d)}>
                    <div slot="header">D3-based SVG Chart</div>
                </D3Chart>
            </TabContent>
            <TabContent>
                <D3DOMChart bind:count on:hover={d => console.log(d)}>
                    <div slot="header">DIV-based Chart</div>
                </D3DOMChart>
            </TabContent>
            <TabContent>
                <VACLabVIS on:resize={d => console.log(d.detail)}>
                </VACLabVIS>
            </TabContent>
        </div>
    </Tabs>
    Hello
    </Column></Row></Grid>
{/if}
</Content>

<Modal passiveModal bind:open={isAboutModalOpen} modalHeading="About VACLab Bias Report">
    <p>
        This is a research prototype designed by the <a href="http://vaclab.unc.edu/">Visual Analysis and Communication
        Lab (VACLab)</a> at the University of North Carolina at Chapel Hill.
    </p>
</Modal>

