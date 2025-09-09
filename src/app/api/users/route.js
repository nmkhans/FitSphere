import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    try {
        const usersCollection = await dbConnect("users");
        const users = await usersCollection.find({}).toArray();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ success: false, message: "Server error" }),
            { status: 500 }
        );
    }
}
export async function PATCH(req) {
  try {
    const data = await req.json(); // { email, height, weight, plan, ... }

    // Define role mapping based on membership plan
    const roleMapping = {
      'Pro Active': 'basic-member',
      'Elite Performance': 'premium-member', 
      'Wellness Plus': 'special-need'
    };

    const usersCollection = await dbConnect("users");
    console.log(usersCollection);
    
    // Prepare update data
    const updateData = { ...data };
    
    // Assign role based on plan if plan is provided
    if (data.plan) {
      updateData.role = roleMapping[data.plan] || 'basic-member';
      updateData.membershipType = data.plan;
      updateData.membershipPurchaseDate = new Date();
    }
    
    const result = await usersCollection.updateOne(
      { email: data.email },
      { $set: updateData } 
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Get updated user data to return
    const updatedUser = await usersCollection.findOne({ email: data.email });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Membership updated successfully!",
        user: {
          role: updatedUser.role,
          membershipType: updatedUser.membershipType
        }
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
