"use client"
import { useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import LazyTabPanel from "./LazyTabPanel";
import { ArrowDown01, ArrowDownZA, ArrowUp10, ArrowUpAZ } from "lucide-react";
import VillainList from "./VillainList";
import 'react-tabs/style/react-tabs.css';
import { Villain } from "../types/Villain";

export default function VillainTabs({ villainsList }: { villainsList: Array<Villain> }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [nameFilter, setNameFilter] = useState('name_asc')
    const [ageFilter, setAgeFilter] = useState('age_asc')

    function handleFilterName(event: any): void {
        if (tabIndex === 1) {
            setNameFilter(nameFilter === 'name_asc' ? 'name_desc' : 'name_asc');
        }
    }

    function handleFilterAge(event: any): void {
        if (tabIndex === 2) {
            setAgeFilter(ageFilter === 'age_asc' ? 'age_desc' : 'age_asc')
        }
    }

    return (
        <>
            <Tabs  selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="cursor-pointer inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                    <Tab className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">All</Tab>
                    <Tab onClick={handleFilterName} className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Name {nameFilter === 'name_asc' ? <ArrowDownZA size={22} /> : <ArrowUpAZ />}</Tab>
                    <Tab onClick={handleFilterAge} className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Age {ageFilter === 'age_asc' ? <ArrowDown01 /> : <ArrowUp10 />}</Tab>
                </TabList>

                <div className="m-5"></div>

                <LazyTabPanel>
                    <VillainList villainsList={villainsList} filter={undefined} />
                </LazyTabPanel>

                <LazyTabPanel >
                    <VillainList villainsList={villainsList} filter={nameFilter} />
                </LazyTabPanel>

                <LazyTabPanel>
                    <VillainList villainsList={villainsList} filter={ageFilter  } />
                </LazyTabPanel>

                


            </Tabs>
        </>
    )
}