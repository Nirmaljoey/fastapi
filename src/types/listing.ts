export interface Listing {
    id: number;
    company_id: number;
    category: string;
    accreditation_required: boolean;
    name: string;
    description: string;
    work_scope: string;
    region: string;
    city: string | null;
    contract_type: string;
    contract_amount: string;
    status: string;
    price: number;
    application_type: string;
    works: string[];
    created_at: string;
    updated_at: string;
    views: number;
    responses: number;
    offers: number;
    is_favorite_for_current_user: boolean;
    response_received: boolean;
}