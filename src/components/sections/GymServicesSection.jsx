import { ArrowRight, User, Droplets, Dumbbell, Apple } from "lucide-react";

export default function GymServicesSection() {
    const services = [
        {
            icon: <User className="w-8 h-8 stroke-2 text-black-dark" />,
            title: "High Quality Training",
            description:
                "One-on-one coaching with certified trainers who create customized workout plans based on your fitness goals and current level.",
        },
        {
            icon: <Droplets className="w-8 h-8 stroke-2 text-black-dark" />,
            title: "Hydration & Recovery",
            description:
                "Premium recovery services including hydration therapy, massage therapy, and post-workout nutrition guidance for optimal results.",
        },
        {
            icon: <Dumbbell className="w-8 h-8 stroke-2 text-black-dark" />,
            title: "Premium Equipment",
            description:
                "State-of-the-art fitness equipment from leading brands, regularly maintained and updated to provide the best workout experience.",
        },
        {
            icon: <Apple className="w-8 h-8 stroke-2 text-black-dark" />,
            title: "Clean Nutrition",
            description:
                "Expert nutritional guidance focusing on whole foods, meal planning, and eliminating processed foods from your diet for better health.",
        },
    ];

    return (
        <section className="py-16 px-4 main-container mx-auto">
            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <div className="inline-block">
                        <span className="bg-black-primary text-green-primary px-4 py-2 rounded-lg text-lg font-semibold">
                            Premium Fitness Services
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-outfit">
                        The Elite Fitness Services
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed font-lato">
                        Transform your fitness journey with our comprehensive range of premium services. From
                        personalized training to cutting-edge equipment, we provide everything you need to achieve your
                        health and wellness goals.
                    </p>
                </div>

                <div className="relative">
                    <img
                        src="/Images/happy-smiling-man-is-doing-exercises-with-training-apparatus-dark-gym-club.jpg"
                        alt="Athlete doing plank exercise in gym"
                        className="w-full h-[400px] object-cover rounded-2xl"
                    />
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="space-y-4">
                        <div className="w-max p-3 rounded-xl bg-green-dark">{service.icon}</div>

                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>

                        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
