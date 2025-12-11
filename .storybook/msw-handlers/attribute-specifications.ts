import { http, HttpResponse } from 'msw';

export const mockSpecPatientName = {
    id: "dcm-0010-0010",
    label: "Patient's Name",
    description: "DICOM (0010,0010) Patient's Name attribute",
};

export const mockSpecPatientSex = {
    id: "dcm-0010-0040",
    label: "Patient's Sex",
    description: "DICOM (0010,0040) Patient's Sex attribute",
};
export const mockSpecTestAttr = {
    id: "test-attribute",
    label: "Test Attribute",
    description: "Simulated Test Attribute",
};

export const mockSpecSimpleList = {
    _embedded: {
        data: [mockSpecPatientName, mockSpecPatientSex, mockSpecTestAttr]
    },
    start: 0,
    count: 3,
    total: 3,
};

export const HandlerAttributeSpecification_SimpleList = [
    http.get('/api/v1/meta-spec/', ({ request }) => {
        const offset = new URL(request.url).searchParams.get("start"); // Access offset parameter if needed
        if (offset !== "0") {
            return HttpResponse.json({
                ...mockSpecSimpleList,
                start: offset, count: 0, total: 3,
                _embedded: { data: [] }
            });
        } else {
            return HttpResponse.json(mockSpecSimpleList);
        }
    }),
];

export const HandlerAttributeSpecification_ScrollableList = (items: number, pageSize:number = 30) => {
    const data = Array.from({ length: items }, (_, i) => ({
        id: `attr-${i}`,
        label: `Attribute ${i}`,
        description: `Description for attribute ${i}`
    }));

    return [
        http.get('/api/v1/meta-spec/', ({ request }) => {
            const offset = parseInt(new URL(request.url).searchParams.get("start") || "0", 10);
            const count = Math.min(pageSize, data.length - offset);
            return HttpResponse.json({
                _embedded: { data: data.slice(offset, offset + count) },
                start: offset,
                count,
                total: data.length
            });
        }),
    ];
};

