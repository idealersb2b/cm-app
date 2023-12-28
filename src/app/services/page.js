"use client"

import React, { useEffect, useState } from 'react';
import Service from "@/app/components/Service/Service"
import Title from "@/app/components/Title/Title"
import { useLazyQuery } from "@apollo/client";
import { QUERY_GET_SERVICES } from "@/app/graphql/productCategories/queries";
import Shimmer_Product from "../components/Shimmer/Shimmer_Product";
import NewsLetter from "../components/NewsLetter/NewsLetter";

function Services() {
    const [loadServices, { loading, error, data }] = useLazyQuery(QUERY_GET_SERVICES);
    const [servicesData, setServicesData] = useState(null);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    useEffect(() => {
        if (data && data.productCategories) {
            setServicesData(data.productCategories.edges[0].node.children.edges);
        }
    }, [data]);

    return (
        <>
        ppp
            {servicesData ? (
                <div className="bg-[#fbfbfb] flex flex-col gap-7">
                    <div className="mx-4 sm:mx-14 pt-14">
                        <Title title={"Services"} />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-4 justify-between">
                            {servicesData.map((e, i) => (
                                <Service key={e.node.id} service={e.node} />
                            ))}
                        </div>
                    </div>
                    <NewsLetter />
                </div>
            ) : null}

            {loading ? (
                <div className="bg-[#fbfbfb]">
                    <div className="mx-14 pt-14">
                        <Title title={"Services"} />
                        <div className="flex flex-wrap justify-between gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e, i) => (
                                <Shimmer_Product key={`sampleId-${i}`} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}

            {error ? (
                <div className="error-message">Error loading services data.</div>
            ) : null}
        </>
    );
}

// Memoize the Services component to prevent unnecessary re-renders
export default React.memo(Services);
